export interface fieldItem {
  // 中文描述
  description: string;
  format: "int64" | "string" | undefined;
  required: undefined;
  type: "string" | "integer";
  // qp-xxx-eq
  name: string;
}

export interface columnItem {
  description: string;
  format: string;
  type: string;
  name: string;
}

export const handleFieldList = (
  fieldList: fieldItem[],
  form: boolean
): (fieldItem & { isTime?: boolean; last?: boolean })[] => {
  // 开始过滤 直接干掉
  const filterList = fieldList.filter(
    (item) =>
      ![
        "currentPage",
        "pageSize",
        "sorter",
        "qp-isvId-eq",
        "qp-isvId-eq",
        "qp-createUserName-eq",
        "qp-modifyUserName-eq",
        "qp-modifyRealName-eq",
      ].includes(item.name)
  );
  // 接下来组件处理 如果swagger有描述数据字典可以取数据字典 目前只能根据时间和input框来
  const finalList = filterList.map((item, index, arr) => {
    const result: fieldItem & { isTime?: boolean; last?: boolean } = {
      ...item,
    };
    if (
      item.name.toLowerCase().includes("time") ||
      item?.description?.includes?.("时间")
    ) {
      try {
        const regex = /qp-(.*?)-/;
        // @ts-ignore
        const name = item.name.match(regex)[1];
        result.name = form ? name : `qp-${name}-ge*fullDate*qp-${name}-le`;
        result.isTime = true;
      } catch (error) {
        debugger;
      }
    }
    result.last = index === arr.length - 1;
    return result;
  });
  return finalList;
};

export const handleColumns = (
  columnList: columnItem[]
): {
  title: string;
  key: string[] | string;
  dataIndex: string[] | string;
  render?: string;
}[] => {
  return columnList
    .filter(
      (item) =>
        (item.name && !["id", "modifyUserId", "bg"]?.includes?.(item.name)) ||
        item?.name?.toLowerCase()?.includes?.("id")
    )
    .map((item) => {
      const result: {
        title: string;
        key: string[] | string;
        dataIndex: string[] | string;
        render?: string;
      } = {
        key: item.name,
        title: item.description,
        dataIndex: item.name,
      };
      if (item?.description?.includes("时间")) {
        result.render = "bs-time";
      }
      return result;
    });
};
