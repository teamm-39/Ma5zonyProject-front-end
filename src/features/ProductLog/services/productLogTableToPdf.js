export const productLogTableToPdf = (data, filters) => {
  const rows =
    data?.data
      .map(
        (item, i) => `
      <tr>
        <td class="p-1 border" style="font-size:10px;">${i + 1}</td>
        <td class="p-1 border" style="font-size:10px;">${item.userName}</td>
        <td class="p-1 border" style="font-size:10px;">${
          item.lookupOperationTypeId === 3
            ? "اضافه"
            : item.lookupOperationTypeId === 4
            ? "تعديل"
            : item.lookupOperationTypeId === 5
            ? "حذف"
            : "-"
        }</td>
        <td class="p-1 border" style="font-size:10px;">${item.oldName}</td>
        <td class="p-1 border" style="font-size:10px;">${
          item.oldPurchasePrice=== 0 ? "-" : item.oldPurchasePrice
        }</td>
        <td class="p-1 border" style="font-size:10px;">${
          item.oldSellingPrice=== 0 ? "-" : item.oldSellingPrice
        }</td>
        <td class="p-1 border" style="font-size:10px;">${item.oldMinLimit===0?"-":item.oldMinLimit}</td>
        <td class="p-1 border" style="font-size:10px;">${item.newName}</td>
        <td class="p-1 border" style="font-size:10px;">${
          item.newPurchasePrice=== 0 ? "-" : item.newPurchasePrice
        }</td>
        <td class="p-1 border" style="font-size:10px;">${
          item.newSellingPrice=== 0 ? "-" : item.newSellingPrice
        }</td>
        <td class="p-1 border" style="font-size:10px;">${item.newMinLimit===0?"-":item.newMinLimit}</td>
        <td class="p-1 border" style="font-size:10px;">${new Date(
          item.dateTime
        ).toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        })}</td>
        <td class="p-1 border" style="font-size:10px;">${new Date(
          item.dateTime
        ).toLocaleDateString("ar-EG")}</td>
      </tr>
    `
      )
      .join("") || "";

  const operationType = filters?.operationType;
  let operationText = "-";
  if (operationType === 3) operationText = "اضافة";
  else if (operationType === 4) operationText = "تعديل";
  else if (operationType === 5) operationText = "حذف";

  return `
  <div class="text-center mt-3">
    <div class="mb-2 d-flex justify-content-around">
      <div>
      <span class="fw-bold">نوع التقرير: تقارير المنتجات</span>
      </div>
      <div >
  <span class="fw-bold">اجمالى العمليات:${data?.total || "0"}</span>
      </div>
    </div>
    <div class="text-center mt-2 fw-bold">
      البحث والتصفيه
    </div>
    <div class="row justify-content-center mt-2">
      <div class="col-3">
        اسم المستخدم: ${filters?.userName || "-"}
      </div>
      <div class="col-3">
        اسم المنتج القديم: ${filters?.oldProductName || "-"}
      </div>
            <div class="col-3">
        اسم المنتج القديم: ${filters?.newProductName || "-"}
      </div>
                  <div class="col-3 mt-2">
        سعر الشراء القديم: ${filters?.oldPurchasePrice || "-"}
      </div>
                        <div class="col-3 mt-2">
        سعر الشراء الجديد: ${filters?.newPurchasePrice || "-"}
      </div>
                              <div class="col-3 mt-2">
        سعر البيع القديم: ${filters?.oldSellingPrice || "-"}
      </div>
                                    <div class="col-3 mt-2">
        سعر البيع الجديد: ${filters?.newSellingPrice || "-"}
      </div>
      <div class="col-3">
        من يوم: ${filters?.dateTime || "-"}
      </div>
      <div class="col-12 text-center mt-2">
        نوع العمليه: ${operationText}
      </div>
    </div>

    <table class="table table-bordered mt-3">
      <thead class="table-light">
        <tr>
          <th class="p-1 border text-center" style="font-size:10px;">#</th>
          <th class="p-1 border text-center" style="font-size:10px;">اسم المستخدم</th>
          <th class="p-1 border text-center" style="font-size:10px;">نوع العمليه</th>
          <th class="p-1 border text-center" style="font-size:10px;">اسم المنتج قبل التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">سعر الشراء قبل التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">سعر البيع قبل التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">الحد الادنى قبل التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">اسم المنتج بعد التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">سعر الشراء بعد التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">سعر البيع بعد التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">الحد الادنى بعد التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">وقت العمليه</th>
          <th class="p-1 border text-center" style="font-size:10px;">تاريخ العمليه</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>
  `;
};
