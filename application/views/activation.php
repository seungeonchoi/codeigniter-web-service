<?php
session_start();
$username="";
$enabled="";

if(isset($_SESSION["username"]) && isset($_SESSION["enabled"])){
    $username = $_SESSION["username"];
    $enabled = $_SESSION["enabled"];
}else{
    ;
}
if($username!="" && $enabled==1){
    header("Location: /index.php/main");
    die();
}
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo asset_url() ?>css/default.css">
    <script src=<?php echo asset_url() ?>js/common.js>
    </script>
</head>
<body>
<div class="header">
    <div class="logo">
        <h1>HYCUBE</h1>
        <div class="explain web">Information Security Institute of Hanyang University</div>
        <div class="mobile mlogin">
            <img class="img_user_mobile" src="<?php echo asset_url() ?>img/user.png">
        </div>
    </div>

</div>
<?php
    include 'component/topnav.php'
?>
<?php
    include 'component/sidenav.php'
?>

<div id="container" class="container">
    <div class="activation_notice">
        <?php
        if($code==="success") {
            ?>
            <h1>Registration Complete</h1>
            <p>You are able to get all features from our website!</p><br/>
            <button class="button grey" onclick="modal('login')">Log in</button>
            <?php
        }else{
            ?>
            <h1>Error Occured</h1>
            <p><?php echo $code ?></p>
            <br/>
            <button class="button blue" onclick='location.href="/index.php"'>Back to home</button>
            <?php
        }
        ?>
    </div>
</div>
<!-- List of Modals -->

<?php include 'component/modal.php' ?>
<div id="footer">
    <h1>HYCUBE</h1>
    <p>경기도 안산시 상록구 한양대학로 55 한양대학교 ERICA캠퍼스 4공학관 1층 SMASH 학습전용공간</p>
</div>


<?php
if ($username != "" && $enabled == 0) {
    ?>
    <script>
        modal('activation');
    </script>
    <?php
}
?>
</body>
</html>
