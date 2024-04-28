




// document.addEventListener('DOMContentLoaded', function () {
//     const signupForm = document.querySelector('.signup-form');
//     signupForm.addEventListener('submit', function (e) {
//         const password = document.getElementById('password').value;
//         if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
//             alert('Password does not meet the complexity requirements.');
//             e.preventDefault(); // Prevent form from submitting
//         } else {
//             // Simulate a successful signup process and redirect to the verification page
//             window.location.href = 'email-verification'; // The URL of your verification page
//             e.preventDefault(); // Remove this line when the backend is implemented
//         }
//     });
// });
//
// //when backend ok then :
// // document.addEventListener('DOMContentLoaded', function () {
// //     const signupForm = document.querySelector('.login-form');
// //     signupForm.addEventListener('submit', function (e) {
// //         e.preventDefault();
// //         const formData = new FormData(signupForm);
// //
// //         // Use fetch to send the form data to the backend
// //         fetch('/path-to-your-signup-handler', {
// //             method: 'POST',
// //             body: formData
// //         })
// //             .then(response => response.json())
// //             .then(data => {
// //                 // Check if the email was sent successfully and redirect
// //                 if (data.emailSent) {
// //                     window.location.href = 'verification-sent.html';
// //                 } else {
// //                     // Handle errors, such as showing a message to the user
// //                 }
// //             })
// //             .catch(error => {
// //                 // Handle any network errors
// //             });
// //     });
// // });
//
