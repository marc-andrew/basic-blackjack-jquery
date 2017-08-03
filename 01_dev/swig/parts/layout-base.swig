{#
Swig description	: Base Layout
Swig author			: Marc Andrew San Buenaventra
#}
<!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" lang="en class="no-js"">
<![endif]-->
<!--[if IE 7]>
<html id="ie7" lang="en" class="no-js">
<![endif]-->
<!--[if IE 8]>
<html id="ie8" lang="en" class="no-js">
<![endif]-->
<!--[if IE 9]>
<html id="ie9" lang="en" class="no-js">
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8) | !(IE 9) ]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
	<meta charset="UTF-8" />

	<title>{{ title }}</title>

	<meta name="description"	content="{{ description }}" />
	<meta name="keywords"		content="{{ keywords }}" />
	<meta name="robots"			content="index, follow" />
	<meta name="viewport"		content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0" />

	<link rel="canonical"		href="http://www.marcandrew.net" />

	<link rel="stylesheet"		type="text/css" href="css/style.css" />

	<!--[if lt IE 9]>
	<script src="{{ html5shiv }}" type="text/javascript"></script>
	<![endif]-->

	<script src="//localhost:35729/livereload.js"></script>

</head>

<body id="{{ page }}" class="{{ category }}">

	<div id="wrapper">

		<!-- Header 
		===================== -->
		{% include '../parts/layout/header.swig' %}
		<!-- Header End -->

		<!-- Main 
		===================== -->
		<main id="main" class="container" role="main">
		{% block main %}{% endblock %}
		</main>
		<!-- Main End -->

	</div>

<script src="{{ jquery }}" type="text/javascript"></script>
<script src="{{ modernizr }}" type="text/javascript" async></script>
<script src="js/script.js" type="text/javascript" async></script>
</body>
</html>
