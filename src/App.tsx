import React, {useState} from 'react';
import Header from "./components/Header";
import Menu from "./components/Menu";

function App() {
    const [counter, setCounter] = useState(1);

    function handleButtonClick() {
        setCounter(counter + 1);
        console.log(counter);
    }
    return (
        <>
            <Header title={'Página Inicial'}/>
            <Header title={'Outro'}/>
            <h1>Hello Dev</h1>
            <p>{ counter }</p>
            <button onClick={handleButtonClick}>Incrementar</button>
            <Menu>
                <ul>
                    <li>Home</li>
                    <li>Contact</li>
                    <li>Abount</li>
                </ul>
            </Menu>
        </>
    );
}

export default App;
