import { useState, useEffect } from 'react';

import { LOGIN_TEST_ENVIRONMENT, LOGIN_TOPIC_ALL_TESTS, LOGIN_TOPIC_SUCCESS_TEST, LOGIN_TOPIC_FAIL_TEST } from '@/hooks/Constans'
import { ARTICULO_TEST_ENVIRONMENT, ARTICULO_TOPIC_ALL_TESTS, ARTICULO_TOPIC_CREATE_COMPUESTO_SUCCESS_TEST, ARTICULO_TOPIC_CREATE_FRACCIONABLE_SUCCESS_TEST, ARTICULO_TOPIC_CREATE_FULL_SUCCESS_TEST, ARTICULO_TOPIC_CREATE_SIMPLE_SUCCESS_TEST, ARTICULO_TOPIC_CREATE_VARIACION_SUCCESS_TEST, ARTICULO_TOPIC_UPDATE_SIMPLE_SUCCESS_TEST } from '@/hooks/Constans'

import { fetchData } from '@/hooks/getData'

const ItemTest = ({ testScope }) => {

    const [loading, setLoading] = useState(false);
    const [currentTopic, setCurrentTopic] = useState({});
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [testArray, setTestArray] = useState([])

    const ejecutarPrueba = async (ruta) => {
        setLoading(true);

        try {
            const response = await fetchData(ruta);
            console.log(response.output);
            setOutput(response.output);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    //* useEffect de Inicio
    useEffect(() => {
        let test = []
        if (testScope === LOGIN_TEST_ENVIRONMENT) {
            test = [
                { id: 0, value: LOGIN_TOPIC_ALL_TESTS, url: 'login/all' },
                { id: 1, value: LOGIN_TOPIC_SUCCESS_TEST, url: 'login/success' },
                { id: 2, value: LOGIN_TOPIC_FAIL_TEST, url: 'login/fail' },
            ]
        } else if (testScope === ARTICULO_TEST_ENVIRONMENT) {
            test = [
                { id: 0, value: ARTICULO_TOPIC_ALL_TESTS, url: 'articulo/all' },
                { id: 1, value: ARTICULO_TOPIC_CREATE_FULL_SUCCESS_TEST, url: 'articulo/full' },
                { id: 2, value: ARTICULO_TOPIC_CREATE_SIMPLE_SUCCESS_TEST, url: 'articulo/simple' },
                { id: 3, value: ARTICULO_TOPIC_CREATE_COMPUESTO_SUCCESS_TEST, url: 'articulo/compuesto' },
                { id: 4, value: ARTICULO_TOPIC_CREATE_FRACCIONABLE_SUCCESS_TEST, url: 'articulo/fraccionable' },
                { id: 5, value: ARTICULO_TOPIC_CREATE_VARIACION_SUCCESS_TEST, url: 'articulo/variacion' },
                { id: 6, value: ARTICULO_TOPIC_UPDATE_SIMPLE_SUCCESS_TEST, url: 'articulo/update/simple' }
            ]
        }
        setCurrentTopic(test[0])
        setTestArray(test)
        console.log('CARGADO');
    }, [testScope]);

    const handleSidebarClick = (id) => {
        setCurrentTopic(testArray[id]);
        setError(null);
        setOutput('');
    };

    return (
        <div className="container mt-3">
            <div className="row">
                {/* <div className="col col-md-4 el1"> */}
                <div className="col col-md-4 mt-5">
                    <h2 className="text-center">{testScope}</h2>

                    {/* Sidebar  */}
                    <div className="row mt-3 ">
                        <nav className="bg-light sub-sidebar">
                            <ul className="nav flex-column sub-sidebar-sticky ">
                                {testArray.map(item => (
                                    <li key={item.id} className="nav-item">
                                        <a className="nav-link active text-center" aria-current="page" onClick={() => handleSidebarClick(item.id)} href="#">
                                            {item.value}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* <div className="col col-md-8 el2"> */}
                <div className="col col-md-8">
                    <div className="form-group mt-5 d-flex justify-content-between">
                        <h3>Ejecución: {currentTopic.value}</h3>
                        <button id="executeButton" className="btn btn-primary btn-block" onClick={() => {
                            ejecutarPrueba(currentTopic.url)
                        }}>Ejecutar prueba</button>

                    </div>
                    {loading == true && (
                        <div className="text-center mt-4">
                            <h5>Ejecutando...</h5>
                        </div>
                    )}

                    <div className="form-group mt-3">
                        <label for="output">Salida:</label>
                        <textarea id="output" className="form-control" value={error ? error : output} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemTest;