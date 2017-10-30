<div id="menu" class="menu">
    <ul class="topnav">
        <li class="mobile"><a href="#home" onclick="open_sidenav()">&#9776;</a></li>
        <li class="mobile"><a class="active" href="#home"><i class="fa fa-home"></i></a></li>
        <li class="mobile dropdown"><a href="#news">

                <i class="fa fa-sticky-note-o"></i>
            </a>
            <div class="dropdown-content">
                <a href="#">Notice</a>
                <a href="#">Freeboard</a>
            </div>
        </li>
        <li class="mobile"><a href="#contact"><i class="fa fa-phone"></i></a></li>
        <li class="mobile"><a href="#about"><i class="fa fa-question-circle"></i></a></li>
        <li class="web"><a href="#home" class="sidenav_btn" onclick="open_sidenav()">&#9776;</a></li>
        <li class="web "><a class="submenu" href="/index.php/main">Home</a></li>
        <li class="web dropdown"><a class="submenu" href="#news">Board</a>
            <div class="dropdown-content">
                <a href="#">Notice</a>
                <a href="#">Freeboard</a>
            </div>
        </li>

        <li class="web"><a class="submenu" href="#contact">Contact</a></li>
        <li class="web"><a class="submenu" href="#about">About</a></li>
        <li class="web right dropdown profile">
            <a class="profile" href="#account">
                <?php if ($username != "") {
                    ?>
                    <img class="img_user" src="<?php echo asset_url() ?>img/user.png">
                    <span><?php echo $username ?></span>
                <?php } else {
                    ?>
                    <img class="img_user" src="<?php echo asset_url() ?>img/user.png">
                    <span>My Information</span>
                    <!-- for debug use
                    <span id="width">w</span><span id="height" style="margin-left: 20px">h</span>
                    -->
                <?php }
                ?>
            </a>
            <?php
            if ($username != "") {
                ?>
                <div class="dropdown-content login_info">
                    <div class="login_desc">
                        <h5><?php echo $username ?></h5>
                    </div>
                    <button onclick="" class="button_small grey">My info</button>
                    <button id="logout" onclick="do_logout()" class="button_small red">Log out</button>
                </div>
                <?php
            } else {
                ?>
                <div class="dropdown-content login_no_info">
                    <div class="login_desc">
                        Login required to access this feature
                    </div>
                    <button onclick="modal('login')" class="button blue">Log in</button>
                    <button id="signup" onclick="modal('register')" class="button red">Sign up</button>
                </div>
                <?php
            }
            ?>
        </li>
    </ul>
</div>