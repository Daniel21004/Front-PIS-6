export async function fetchData(url, method="GET") {
    const res = await fetch(`http://127.0.0.1:5000/${url}`,
        {
            method: method,
            headers: new Headers({
                "Accept": "application/json",
                "Content-type": "application/json;  charset=UTF-8"
            }),
            cache: 'no-store'
        }
    );
    console.log({ res })
    if (!res.ok) {
        console.log('err');
        throw new Error('Failed to Back');
    }   
    return res.json();
}
