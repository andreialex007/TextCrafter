import Panel from "./components/Panel";
import "./App.css";

let text = `A smartphone is a mobile device that combines the functionality of a
        traditional mobile phone with advanced computing capabilities. It
        typically has a touchscreen interface, allowing users to access a wide
        range of applications and services, such as web browsing, email, and
        social media, as well as multimedia playback and streaming. Smartphones
        have built-in cameras, GPS navigation, and support for various
        communication methods, including voice calls, text messaging, and
        internet-based messaging apps. Smartphones are distinguished from
        older-design feature phones by their more advanced hardware capabilities
        and extensive mobile operating systems, access to the internet, business
        applications, mobile payments, and multimedia functionality, including
        music, video, gaming, radio, and television.`;

function App() {
  return (
    <>
      <textarea style={{ width: "100%" }} rows={5} value={"Экран"}></textarea>
      <Panel />
    </>
  );
}

export default App;
