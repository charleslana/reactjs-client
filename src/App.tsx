import React from 'react';
import Header from "./components/Header";
import Menu from "./components/Menu";

function App() {
    return (
        <>
            <Header title={'Página Inicial'}/>
            <Header title={'Outro'}/>
            <h1>Hello Dev</h1>
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
