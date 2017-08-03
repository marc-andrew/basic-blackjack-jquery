{% extends '../parts/layout-base.swig' %}

			{% block main %}

			<div id="gamer-hand">
				<div class="inner">

				</div>
			</div>
			<div id="game-btns">
				<button type="button" id="deal" class="btn btn-primary">Deal</button>
				<button type="button" id="hit" class="btn btn-primary" disabled>Hit</button>
				<button type="button" id="stick" class="btn btn-secondary" disabled>Stick</button>
			</div>

			{% endblock %}

