import { handleColumns, columnItem, handleCombinationList } from "../utils";
import { IApi } from "@umijs/types";
import { Generator } from "@umijs/utils";
import { join } from "path";
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

function getColoums(
  properties: { [key: string]: columnItem },
  definitions: any
) {
  return handleColumns(
    Object.entries(properties)
      .map((item: [string, Omit<columnItem, "name">]) => {
        // 暂定是只有两层 算了 写个递归
        if (item[1].originalRef) {
          const combinationList: columnItem[] = [];
          definitions[item[1].originalRef];
          handleCombinationList(
            combinationList,
            definitions,
            item[1].originalRef,
            [item[0]]
          );
          return combinationList;
        }
        return { name: item[0], ...item[1] };
      })
      .flat(Infinity) as columnItem[]
  );
}

export default function ({ api }: { api: IApi }) {
  return class PageGenerator extends Generator {
    constructor(opts: any) {
      super(opts);
    }

    async writing() {
      const {
        url,
        voName,
        filePath,
        componentName,
      } = api.userConfig.codeGenerate?.table;
      // 4个参数 缺一不可
      if ([url, voName, filePath, componentName].some((item) => !item)) {
        console.error("参数不全，请检查！");
        // 退出程序
        process.exit(1);
      }

      const {
        data: { definitions },
      } = await axios.get(url);
      const properties = definitions?.[voName]?.properties;
      if (!properties) {
        console.warn("请检查实体名称");
        // 退出程序
        process.exit(1);
      }

      try {
        const file = fs.readFileSync(
          join(
            api.paths.absPagesPath!,
            filePath,
            "/components/",
            `${componentName}.tsx`
          ),
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
      const coloums = getColoums(properties, definitions);
      debugger;
      this.copyTpl({
        templatePath: join(__dirname, `table.tsx.tpl`),
        target: join(
          api.paths.absPagesPath!,
          filePath,
          "/components/",
          `${componentName}.tsx`
        ),
        context: {
          coloums,
        },
      });
    }
  };
}
