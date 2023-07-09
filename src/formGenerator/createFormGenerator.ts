import { fieldItem, handleFieldList, handleColumns } from "../utils";
import { IApi } from "@umijs/types";
import { Generator } from "@umijs/utils";
import { join } from "path";
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");


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

export default function ({ api }: { api: IApi }) {
  return class PageGenerator extends Generator {
    constructor(opts: any) {
      super(opts);
    }

    async writing() {
      const {
        url,
        routePath,
        detailPath,
        postPath,
        filePath,
        locale
      } = api.userConfig.codeGenerate?.form;
      // 5个东西 缺一不可
      if (
        [url, detailPath, postPath, filePath, routePath].some((item) => !item)
      ) {
        console.error("参数不全，请检查！");
        // 退出程序
        process.exit(1);
      }

      const {
        data: { paths, definitions, basePath },
      } = await axios.get(url);
      if (!paths[postPath]) {
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
          join(api.paths.absPagesPath!, filePath, `/form.tsx`),
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

      const { createFields } = handleCreateModal(
        paths,
        postPath,
        definitions
      );
      this.copyTpl({
        templatePath: join(__dirname, `form.tsx.tpl`),
        target: join(api.paths.absPagesPath!, filePath, `/form.tsx`),
        context: {
          path: basePath + detailPath.replace(/\{.*?\}/, "${id}"),
          fields:createFields,
          routePath,
          postPath: basePath + postPath,
          filePath,
          routeName:filePath.substring(1).replaceAll("/","-"),
          locale
        },
      });
    }
  };
}
