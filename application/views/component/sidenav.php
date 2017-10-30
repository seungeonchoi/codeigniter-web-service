<ul id="sidenav" class="sidenav">
    <li>
        <div id="intro">
            <h3>Winter 2016</h3>
        </div>
    </li>
    <li>
        <?php
        if ($username != "") {
            ?>
            <a onclick="do_logout()" href="#logout">
                Log out
            </a>

            <?php
        } else {
            ?>
            <a onclick="modal('login')" href="#login">
                Log in
            </a>
            <?php
        }
        ?>
    </li>
    <li><a href="#home">Home</a></li>
    <li class="application">
        <a>
            Application
            <i class="fa fa-caret-down" style="display: inline;float:right"></i>
        </a>
        <ul class="navdrop">
            <li><a href="/index.php/main/notepad">notepad</a></li>
            <li><a href="#draw">draw</a></li>
        </ul>
    </li>

</ul>