/**
 * Admin email body (mirrors resources/views/mail/booking.blade.php)
 */
export function bookingAdminHtml(information) {
  const addonsList =
    information.addons?.length > 0
      ? `<div><h5>Addons</h5><ul>${information.addons.map((item) => `<li>${item}</li>`).join('')}</ul></div>`
      : '';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body class="font-sans antialiased">
  <div>
    <div><strong>Name:</strong> ${information.name}</div>
    <div><strong>Email:</strong> ${information.email}</div>
    <div><strong>Phone:</strong> ${information.phone}</div>
    <div><strong>Availability</strong> ${information.date}</div>
    <div><strong>Preferred Time</strong> ${information.preferred}</div>
    <div><strong>Mobile: </strong> ${information.mobile}</div>
    ${information.mobile === 'Yes' ? `<div><strong>Address</strong> ${information.address}</div>` : ''}
    <div><strong>Vehicle</strong> ${information.vehicle}</div>
    <div><strong>Additional Info:</strong> ${information.additional}</div>
  </div>
  <br>
  <div>
    <div><strong>Package:</strong> ${information.package}</div>
    ${addonsList}
  </div>
</body>
</html>
`.trim();
}
