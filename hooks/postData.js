export async function postData(url, body, method = "POST") {
    const res = await fetch(`http://127.0.0.1:5000/${url}`,
        {
            method: method,
            headers: new Headers({
                "Accept": "application/json",
                "Content-type": "application/json"
            }),
            body: JSON.stringify(body)
        }
    );
    console.log({ res })
    console.log("data json " + JSON.stringify(body))
    if (!res.ok) {
        throw new Error('Failed to Back');
    }
    return res.json();
}