
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="icon" href="http://localhost/assets/img/favicon.gif" type="image/gif">
    <link rel="stylesheet" href="<?php echo asset_url() ?>css/default.css">
    <link rel="stylesheet" href="<?php echo asset_url() ?>notepad/notepad.css">
    <script src="<?php echo asset_url() ?>notepad/notepad.js">
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


<div id="container" class="container">
        <div class="notepad_section" style="height: 800px">
            <h2>WYSIWYG Editor</h2>
            <form method="post" action="/app/notepad/notepad_result.php" enctype="multipart/form-data" id="rtf">

                <br>
                <textarea name="textarea" id="textarea" style="display: none;"></textarea>
                <br><br>
                <input type="button" onclick="noteValue('textarea')" value="post">
            </form>
        </div>
</div>


<div id="footer">
    <h1>HYCUBE</h1>
    <p>경기도 안산시 상록구 한양대학로 55 한양대학교 ERICA캠퍼스 4공학관 1층 SMASH 학습전용공간</p>
</div>


</body>
</html>
