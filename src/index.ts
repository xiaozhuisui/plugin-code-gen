/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-02-23 11:19:45
 * @LastEditTime: 2021-02-24 10:56:49
 * @LastEditors: rodchen
 */
import { join } from "path";
import { IApi } from "umi";
import { readFileSync, writeFileSync } from "fs";

export default function (api: IApi) {
  // 注册阶段执行，用于描述插件或插件集的 id、key、配置信息、启用方式等。
  api.describe({
    key: "bsComponents",
    config: {
      schema(joi) {
        return joi.object({
          locale: joi.object({
            default: joi.string(),
            baseNavigator: joi.boolean(),
            baseSeparator: joi.string(),
          }),
        });
      },
    },
    enableBy: api.EnableBy.config,
  });

  api.onGenerateFiles(() => {
    const { locale = {} } = api.config.bssula;
    // 读文件
    const configProviderTpl = readFileSync(
      join(__dirname, "../template/configProvider.js"),
      "utf-8"
    );
    // 临时目录绝对路径
    const configProviderWrapperPath = join(
      api.paths.absTmpPath,
      "BsComponentsProviderWrapper.js"
    );
    writeFileSync(
      configProviderWrapperPath,
      // 导出自 mustache, 无逻辑的模版语法，是 JavaScript 中的 mustache 模板系统的零依赖实现
      api.utils.Mustache.render(configProviderTpl, locale),
      "utf-8"
    );
  });
  // 添加运行时插件，返回值格式为表示文件路径的字符串。
  api.addRuntimePlugin(() =>
    join(api.paths.absTmpPath, "./BsComponentsProviderWrapper.js")
  );

}
