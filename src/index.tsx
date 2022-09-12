import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./AppRouter/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<div className="App">
			<AppRouter />
		</div>
	</React.StrictMode>
);

reportWebVitals();
