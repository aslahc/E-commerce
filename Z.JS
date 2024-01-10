
<script>
// Automatically close the alert after 5 seconds
setTimeout(function () {
    var alertDiv = document.querySelector('.invalid-feedback');
    if (alertDiv) {
        alertDiv.style.display = 'none';
    }
}, 5000);
</script>
<script>
var countdown = 60; // Set the initial countdown time in seconds

function updateCountdown() {
    document.getElementById('countdown').innerHTML = 'Resend OTP in ' + countdown + ' seconds';
}

function startCountdown() {
    var countdownInterval = setInterval(function () {
        if (countdown > 0) {
            countdown--;
            updateCountdown();
        } else {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<button type="submit" style="background: none; color: #4CAF50; padding: 0; border: none; cursor: pointer; text-decoration: underline;" class="btn btn-link" onclick="startResend()">Resend OTP</button>';
        }
    }, 1000);
}

function startResend() {
    // Add your logic here to trigger OTP resend
    // For now, let's reset the countdown to 60 seconds
    countdown = 60;
    startCountdown();
}

// Start the countdown when the page loads
document.addEventListener('DOMContentLoaded', function () {
    startCountdown();
});

// Automatically close the alert after 5 seconds
setTimeout(function () {
    var alertDiv = document.querySelector('.invalid-feedback');
    if (alertDiv) {
        alertDiv.style.display = 'none';
    }
}, 5000);
</script>