import Toast from "@/components/Toast/Toast.jsx";
import * as initialize from "../../assets/script/firebase.js";
import "../styles/globals.css";

export const metadata = {
  title: "TechTide To Do App",
  description: "Track your tasks and never get lost again!",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <script src={JSON.parse(JSON.stringify(initialize))}></script>
      </head>
      <body>
        <Toast />
        <div className='container mx-auto'>{children}</div>
      </body>
    </html>
  );
}
