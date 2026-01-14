<!doctype html>
<html lang="hu">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<title>Bevásárlás</title>
        <link rel="icon" href="./img/favicon.png">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	</head>
	<body onload="initUI()">

    <div id="loading-container">
        <div class="loader"></div>
    </div>

		<div class="search-container">
            <div class="search_bar">
                <input type="text" id="searchBar" placeholder="Írd be a keresendő termék nevét..." onkeypress="searchTerm(value, event)">
                <button onclick="searchTerm(searchBar.value, event)" type="submit"><i class="fa fa-search"></i></button>
            </div>
            <div class="shop-selector">
              <span id="shopsContainer" class="shops"></span>
            </div>
        </div>
        <div class="item-container">
            <div id="itemCont" class="cards-grid"></div>
        </div>
		<script src="./js/main.js"></script>
	</body>
</html>
