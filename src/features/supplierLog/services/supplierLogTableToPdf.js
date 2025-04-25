export const supplierLogTableToPdf = (data, filters) => {
  const date = new Date(filters?.fromDateTime || ""); // إذا مفيش تاريخ يعرض "-"
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const fromDateTime = filters?.fromDateTime ? date.toLocaleDateString('ar-EG', options) : "-";
  const date2 = new Date(filters?.toDateTime || ""); // إذا مفيش تاريخ يعرض "-"
  const toDateTime = filters?.toDateTime ? date2.toLocaleDateString('ar-EG', options) : "-";
  const rows =
    data?.data
      .map(
        (item, i) => `
      <tr>
        <td class="p-1 border align-content-center" style="font-size:10px;">${i + 1}</td>
        <td class="p-1 border align-content-center" style="font-size:10px;">${item.userName}</td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          ${
            item.lookupOperationTypeId === 3
              ? "اضافه"
              : item.lookupOperationTypeId === 4
              ? "تعديل"
              : item.lookupOperationTypeId === 5
              ? "حذف"
              : "-"
          }
        </td>
        <td class="p-1 border" style="font-size:10px;">
          <span>قبل: ${item.oldName || "-"}</span><br />
          <span>بعد: ${item.newName || "-"}</span>
        </td>
                <td class="p-1 border" style="font-size:10px;">
          <span>قبل: ${item.oldAge == 0 ? "-" : item.oldAge}</span><br />
          <span>بعد: ${item.newAge == 0 ? "-" : item.newAge}</span>
        </td>
                <td class="p-1 border" style="font-size:10px;">
          <span>قبل: ${item.oldEmail || "-"}</span><br />
          <span>بعد: ${item.newEmail || "-"}</span>
        </td>
        <td class="p-1 border" style="font-size:10px;">
          <span>قبل: ${item.oldAddress || "-"}</span><br />
          <span>بعد: ${item.newAddress || "-"}</span>
        </td>
        <td class="p-1 border" style="font-size:10px;">
          <span>قبل: ${item.oldPhoneNumber || "-"}</span><br />
          <span>بعد: ${item.newPhoneNumber || "-"}</span>
        </td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          ${new Date(item.dateTime).toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          ${new Date(item.dateTime).toLocaleDateString("ar-EG")}
        </td>
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
        <span class="fw-bold">نوع التقرير: تقارير الموردين</span>
      </div>
      <div>
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
        اسم المورد القديم: ${filters?.oldName || "-"}
      </div>
      <div class="col-3">
        اسم المورد الجديد: ${filters?.newName || "-"}
      </div>
            <div class="col-3">
        البريد الالكترونى القديم: ${filters?.oldEmail || "-"}
      </div>
      <div class="col-3 mt-2">
        البريد الالكترونى الجديد: ${filters?.newEmail || "-"}
      </div>
      <div class="col-3 mt-2">
        رقم الهاتف القديم: ${filters?.oldPhone || "-"}
      </div>
      <div class="col-3 mt-2">
        رقم الهاتف الجديد: ${filters?.newPhone || "-"}
      </div>
      <div class="col-3 mt-2">
        العنوان القديم: ${filters?.oldAddress || "-"}
      </div>
      <div class="col-3 mt-2">
        العنوان الجديد: ${filters?.newAddress || "-"}
      </div>
      <div class="col-3">
        من يوم: ${fromDateTime || "-"}
      </div>
            <div class="col-3 mt-2">
        الى يوم: ${toDateTime || "-"}
      </div>
      <div class="col-3 mt-2">
        نوع العمليه: ${operationText}
      </div>
    </div>
    <table class="table table-bordered mt-3">
      <thead class="table-light">
        <tr>
          <th class="p-1 border text-center" style="font-size:10px;">#</th>
          <th class="p-1 border text-center" style="font-size:10px;">اسم المستخدم</th>
          <th class="p-1 border text-center" style="font-size:10px;">نوع العمليه</th>
          <th class="p-1 border text-center" style="font-size:10px;">اسم المورد</th>
          <th class="p-1 border text-center" style="font-size:10px;">عمر المورد</th>
          <th class="p-1 border text-center" style="font-size:10px;">البريد الالكترونى</th>
          <th class="p-1 border text-center" style="font-size:10px;">مكان المورد</th>
          <th class="p-1 border text-center" style="font-size:10px;">رقم الهاتف</th>
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