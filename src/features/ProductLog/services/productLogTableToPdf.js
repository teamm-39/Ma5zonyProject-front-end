export const productLogTableToPdf = (data, filters) => {
  const rows =
    data?.data
      .map(
        (item,i) => `
      <tr>
        <td class="p-1 border" style="font-size:10px;">${i+1}</td>
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
        <td class="p-1 border" style="font-size:10px;">${item.oldCountry}</td>
        <td class="p-1 border" style="font-size:10px;">${item.olgCity}</td>
        <td class="p-1 border" style="font-size:10px;">${item.newName}</td>
        <td class="p-1 border" style="font-size:10px;">${item.newCountry}</td>
        <td class="p-1 border" style="font-size:10px;">${item.newCity}</td>
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
      <span class="fw-bold">نوع التقرير: تقارير المخازن</span>
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
        اسم المخزن: ${filters?.storeName || "-"}
      </div>
      <div class="col-3">
        من يوم: ${filters?.dateTime || "-"}
      </div>
      <div class="col-3">
        نوع العمليه: ${operationText}
      </div>
    </div>

    <table class="table table-bordered mt-3">
      <thead class="table-light">
        <tr>
          <th class="p-1 border text-center" style="font-size:10px;">#</th>
          <th class="p-1 border text-center" style="font-size:10px;">اسم المستخدم</th>
          <th class="p-1 border text-center" style="font-size:10px;">نوع العمليه</th>
          <th class="p-1 border text-center" style="font-size:10px;">اسم المخزن قبل التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">الدوله قبل التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">المدينه قبل التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">اسم المخزن بعد التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">الدوله بعد التعديل</th>
          <th class="p-1 border text-center" style="font-size:10px;">المدينه بعد التعديل</th>
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
