export const ownerLogTableToPdf = (data, filters) => {
  const date = new Date(filters?.fromDateTime || "");
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const fromDateTime = filters?.fromDateTime ? date.toLocaleDateString('ar-EG', options) : "-";
  const date2 = new Date(filters?.toDateTime || "");
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
              ? "اضافة"
              : item.lookupOperationTypeId === 4
              ? "تعديل"
              : item.lookupOperationTypeId === 5
              ? "حذف"
              : "-"
          }
        </td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          <span>قبل: ${item.oldName || "-"}</span><br />
          <span>بعد: ${item.newName || "-"}</span>
        </td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          <span>قبل: ${item.oldUserName || "-"}</span><br />
          <span>بعد: ${item.newUserName || "-"}</span>
        </td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          <span>قبل: ${item.oldAge == 0 ? "-" : item.oldAge}</span><br />
          <span>بعد: ${item.newAge == 0 ? "-" : item.newAge}</span>
        </td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          <span>قبل: ${item.oldPhoneNumber || "-"}</span><br />
          <span>بعد: ${item.newPhoneNumber || "-"}</span>
        </td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          <span>قبل: ${item.oldAddress || "-"}</span><br />
          <span>بعد: ${item.newAddress || "-"}</span>
        </td>
        <td class="p-1 border align-content-center" style="font-size:10px;">
          <span>قبل: ${item.oldEmail || "-"}</span><br />
          <span>بعد: ${item.newEmail || "-"}</span>
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
        <span class="fw-bold">نوع التقرير: تقارير الملاك</span>
      </div>
      <div>
        <span class="fw-bold">اجمالى العمليات: ${data?.total || "0"}</span>
      </div>
    </div>
    <div class="text-center mt-2 fw-bold">
      البحث والتصفية
    </div>
    <div class="row justify-content-center mt-2 ">
      <div class="col-3">
        اسم المستخدم: ${filters?.userName || "-"}
      </div>
      <div class="col-3">
        اسم المالك القديم: ${filters?.oldName || "-"}
      </div>
      <div class="col-3">
        اسم المالك الجديد: ${filters?.newName || "-"}
      </div>
      <div class="col-3">
        اسم المستخدم القديم للمالك: ${filters?.oldUserName || "-"}
      </div>
      <div class="col-3">
        اسم المستخدم الجديد للمالك: ${filters?.newUserName || "-"}
      </div>
      <div class="col-3 mt-2">
        رقم الهاتف القديم: ${filters?.oldPhoneNumber || "-"}
      </div>
      <div class="col-3 mt-2">
        رقم الهاتف الجديد: ${filters?.newPhoneNumber || "-"}
      </div>
      <div class="col-3 mt-2">
        العنوان القديم: ${filters?.oldAddress || "-"}
      </div>
      <div class="col-3 mt-2">
        العنوان الجديد: ${filters?.newAddress || "-"}
      </div>
      <div class="col-3 mt-2">
        البريد الالكتروني القديم: ${filters?.oldEmail || "-"}
      </div>
      <div class="col-3 mt-2">
        البريد الالكتروني الجديد: ${filters?.newEmail || "-"}
      </div>
      <div class="col-3 mt-2">
        نوع العملية: ${operationText}
      </div>
      <div class="col-3 mt-2">
        من يوم: ${fromDateTime || "-"}
      </div>
      <div class="col-3 mt-2">
        إلى يوم: ${toDateTime || "-"}
      </div>
    </div>
    <table class="table table-bordered mt-3">
      <thead class="table-light">
        <tr>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">#</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">اسم المستخدم</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">نوع العملية</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">اسم المالك</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">اسم المستخدم للمالك</th>
          <th class="p-1 border text-cente align-content-centerr" style="font-size:10px;">عمر المالك</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">رقم الهاتف</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">مكان الاقامة</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">البريد الالكتروني</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">وقت العملية</th>
          <th class="p-1 border text-center align-content-center" style="font-size:10px;">تاريخ العملية</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>
  `;
};
