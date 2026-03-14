/**
 * Customer confirmation email body (mirrors resources/views/mail/confirmation.blade.php)
 */
export function confirmationHtml(information) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body class="font-sans antialiased">
  <div>
    Hi ${information.name}, your booking request for ${information.package} has been received and we will get back to you as soon as possible.
  </div>
</body>
</html>
`.trim();
}
