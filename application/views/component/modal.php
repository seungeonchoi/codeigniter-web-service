<div id="login" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <div class="modal-header">
            <span class="close">&times;</span>
            <h3>User Authentication</h3>
        </div>
        <div class="modal-body">
            <form method="post" onsubmit="return do_login()">
                <label for="fname">Username</label>
                <input type="text" id="login_username" name="username" placeholder="example@hanyang.ac.kr">
                <label for="lname">Password</label>
                <input type="password" id="login_password" name="password">
                <button id="login_button" type="submit" class="button blue full">Submit</button>
            </form>
            <div class="error">
                <div class="info" style="width:5%"><i class="fa fa-warning"></i></div><div class="info" style="width:80%"></div>
            </div>
        </div>
    </div>
</div>

<div id="register" class="modal">

    <div class="modal-content">
        <div class="modal-header">
            <span class="close">&times;</span>
            <h3>Register</h3>
        </div>
        <div class="modal-body">
            <form method="post" onsubmit="return do_signup()">
                <label for="fname">Username</label>
                <input type="text" id="username" name="username" placeholder="example@hanyang.ac.kr">

                <label for="lname">Password</label>
                <input type="password" id="password" name="password">
                <button id="signup_button" type="submit" class="button blue full">Submit</button>
            </form>
            <div class="error">
                <div class="info" style="width:5%"><i class="fa fa-warning"></i></div><div class="info" style="width:80%">Please enter valid e-mail address</div>
            </div>

        </div>
    </div>
</div>
<div id="myinfo" class="modal">

    <div class="modal-content">
        <div class="modal-header">
            <span class="close">&times;</span>
            <h3>Register</h3>
        </div>
        <div class="modal-body">
            <form>
                <label for="fname">Username</label>
                <input type="text" id="username" name="username" placeholder="example@hanyang.ac.kr">
                <label for="lname">Password</label>
                <input type="password" id="password" name="password">
            </form>
            <button class="button blue full" onclick="do_modify()">Submit</button>
            <button class="button red full" onclick="do_delete()">Delete Account</button>
        </div>
    </div>
</div>
<div id="confirm" class="modal">

    <div class="modal-content" style="width: 30%">
        <div class="modal-header">
            <span class="close">&times;</span>
            <h3>System</h3>
        </div>
        <div class="modal-body" style="text-align: center">
            <p>Activation link has been sent via your email.</p>
            <p>Please check your email address for registration.</p>
            <button class="button" onclick="modal_reset()">OK</button>
        </div>
    </div>
</div>
<div id="login_fail" class="modal">

    <div class="modal-content" style="width: 30%">
        <div class="modal-header">
            <span class="close">&times;</span>
            <h3>System</h3>
        </div>
        <div class="modal-body" style="text-align: center">
            <p>Your username or password does not match any account.</p>
            <p>Please make sure that you have valid username and password</p>
            <button class="button" onclick="modal_reset()">OK</button>
        </div>
    </div>
</div>
<div id="activation" class="modal">

    <div class="modal-content" style="width: 50%">
        <div class="modal-header">
            <span class="close">&times;</span>
            <h3>Activation required</h3>
        </div>
        <div class="modal-body" style="text-align: center">
            <p>Please verify your account by activation email sent to you </p>
            <p>If you have not recieved yet, you may retry by clicking 'Send e-mail' button</p>
            <button id="send_mail" class="button blue" onclick="send_mail('<?php echo $username ?>')">Send e-mail
            </button>
            <button class="button red" onclick="modal_reset()">Cancel</button>
        </div>
    </div>
</div>