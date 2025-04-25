export const storeLogTableToPdf = (data, filters) => {
  const date = new Date(filters?.dateTime || ""); // إذا مفيش تاريخ يعرض "-"
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = filters?.dateTime ? date.toLocaleDateString('ar-EG', options) : "-";
  const rows =
    data?.data
      .map(
        (item, i) => `
      <tr>
        <td class="p-1 border align-content-center" style="font-size:10px;">${i + 1}</td>
        <td class="p-1 border align-content-center" style="font-size:10px;">${item.userName}</td>
        <td class="p-1 border align-content-center" style="font-size:10px;">${
          item.lookupOperationTypeId === 3
            ? "اضافه"
            : item.lookupOperationTypeId === 4
            ? "تعديل"
            : item.lookupOperationTypeId === 5
            ? "حذف"
            : "-"
        }</td>
<td class="p-1 border" style="font-size:10px;">
  <span>قبل: ${item.oldName}</span><br />
  <span>بعد: ${item.newName}</span>
</td>
<td class="p-1 border" style="font-size:10px;">
  <span>قبل: ${item.oldCountry}</span><br />
  <span>بعد: ${item.newCountry}</span>
</td>
<td class="p-1 border" style="font-size:10px;">
  <span>قبل: ${item.olgCity}</span><br />
  <span>بعد: ${item.newCity}</span>
</td>
        <td class="p-1 border align-content-center" style="font-size:10px;">${new Date(
          item.dateTime
        ).toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        })}</td>
        <td class="p-1 border align-content-center" style="font-size:10px;">${new Date(
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
        من يوم: ${formattedDate|| "-"}
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
          <th class="p-1 border text-center" style="font-size:10px;">اسم المخزن</th>
          <th class="p-1 border text-center" style="font-size:10px;">الدوله</th>
          <th class="p-1 border text-center" style="font-size:10px;">المدينه</th>
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
