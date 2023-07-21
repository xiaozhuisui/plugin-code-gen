import { fieldItem, handleFieldList, handleColumns } from "../utils";
import { IApi } from "@umijs/types";
import { Generator } from "@umijs/utils";
import { join } from "path";
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

function handleCreateList(paths: any, path: string, definitions: any) {
  const fields: fieldItem[] = handleFieldList(
    paths[path]["get"]["parameters"] as fieldItem[],
    false
  );

  //"ResultVo«List«SkuResVo»»";
  const str = paths[path]["get"]["responses"]["200"]["schema"]["originalRef"];
  const start = str.lastIndexOf("«") + 1;
  const end = str.lastIndexOf("»");
  const voName = str.substring(start, end - 1);
  const coloums = handleColumns(
    Object.entries(
      definitions[voName]["properties"] as {
        [key: string]: {
          description: string;
          format: string;
          type: string;
        };
      }
    ).map(
      (
        item: [string, { description: string; format: string; type: string }]
      ) => ({ name: item[0], ...item[1] })
    )
  );
  return { fields, coloums };
}

function handleCreateModal(paths: any, addPath: string, definitions: any) {
  if (!addPath || !paths?.[addPath]?.["post"]) {
    return { hasCreate: false };
  }
  const voName =
    paths[addPath]["post"]["parameters"][0]["schema"]["originalRef"];
  const createFields: fieldItem[] = handleFieldList(
    Object.entries(
      definitions[voName]["properties"] as {
        [key: string]: {
          description: string;
          format: string;
          type: string;
        };
      }
    ).map(
      (
        item: [string, { description: string; format?: string; type: string }]
      ) => ({ name: item[0], ...item[1] })
    ) as fieldItem[],
    true
  );
  return { hasCreate: true, createFields };
}
function handleEditModal(
  paths: any,
  editPath: string,
  definitions: any,
  editMethodName: "patch" | "put"
) {
  if (!editPath || !paths?.[editPath]?.[editMethodName]) {
    return { hasEdit: false };
  }
  const length = paths[editPath]?.[editMethodName]?.["parameters"]?.length;
  const voName =
    paths[editPath]?.[editMethodName]?.["parameters"]?.[length - 1]?.["schema"][
      "originalRef"
    ];
  const editFields: fieldItem[] = handleFieldList(
    Object.entries(
      definitions[voName]["properties"] as {
        [key: string]: {
          description: string;
          format: string;
          type: string;
        };
      }
    ).map(
      (
        item: [string, { description: string; format?: string; type: string }]
      ) => ({ name: item[0], ...item[1] })
    ) as fieldItem[],
    true
  );
  return {
    hasEdit: true,
    editFields,
    editPath: editPath.replace(/\{.*?\}/, "#{record.id}"),
  };
}
function handleDelete(paths: any, delPath: string) {
  return {
    hasDel: Boolean(paths?.[delPath]),
    delPath: delPath?.replace(/\{.*?\}/, "#{record.id}"),
  };
}

export default function ({ api }: { api: IApi }) {
  return class PageGenerator extends Generator {
    constructor(opts: any) {
      super(opts);
    }

    async writing() {
      const {
        url,
        path,
        locale,
        filePath,
        routePath,
        addPath,
        editPath,
        editMethodName,
        deletePath,
      } = api.userConfig.codeGenerate?.list;
      // 5个东西 缺一不可
      if ([url, path, locale, filePath, routePath].some((item) => !item)) {
        console.error("参数不全，请检查！");
        // 退出程序
        process.exit(1);
      }

      const {
        data: { paths, definitions, basePath },
      } = await axios.get(url);
      if (!paths[path]) {
        console.warn("请检查接口path路径");
        // 退出程序
        process.exit(1);
      }
      // 接下来查找 整理数据
      // 后面可能要读文件 写文件
      // 不想根据命令行 直接根据用户配置生成

      // 加个交互 读文件 防止手抖
      try {
        const file = fs.readFileSync(
          join(api.paths.absPagesPath!, filePath, `/list.tsx`),
          "utf8"
        );
        if (file) {
          const { confirm } = await inquirer.prompt([
            {
              type: "confirm",
              name: "confirm",
              message: "该目录下已有文件 是否生成？",
              default: false,
            },
          ]);
          if (!confirm) {
            // 终止线程
            process.exit(1);
          }
        }
      } catch (err) {
        console.error(err);
      }
      const { fields, coloums } = handleCreateList(paths, path, definitions);

      const { hasCreate, createFields } = handleCreateModal(
        paths,
        addPath,
        definitions
      );

      const { hasEdit, editFields, editPath: finalEditPath } = handleEditModal(
        paths,
        editPath,
        definitions,
        editMethodName
      );

      const { hasDel, delPath: finalDelPath } = handleDelete(paths, deletePath);
      debugger;
      this.copyTpl({
        templatePath: join(__dirname, `list.tsx.tpl`),
        target: join(api.paths.absPagesPath!, filePath, `\list.tsx`),
        context: {
          path: basePath + path,
          fields,
          coloums,
          routePath,
          locale,
          filePath,
          routeName:filePath.substring(1).replaceAll("/","-"),

          addPath,
          hasCreate,
          createFields,

          hasEdit,
          editFields,
          finalEditPath,
          editMethodName,

          hasDel,
          finalDelPath,
        },
      });
    }
  };
}
