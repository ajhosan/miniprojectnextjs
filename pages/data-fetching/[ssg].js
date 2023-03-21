export default function SSG(cx) {
    // console.log("cxx", cx)
    return (
        <div className={'w-full'}>
            <h1>Static Site Generation</h1>

            <div className={'w-full p-4 bg-grey-200'}>

            </div>
        </div>
    )
}

export async function getStaticPaths(ctx) {

    let [err, data] = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((response) => {
            return [null, response]
        })
        .catch((err) => {
            console.log(`[Error]\nCaused: ${err.message}`)
            return [err, null]
        })

    if (err) {
        return {
            paths: [],
            fallback: false
        }
    }

    let paths = [];

    // if(Array.isArray(data) && data.length > 0){
    paths = data.map((post) => ({
        params: {
            ssg: `${post.id}`
        }
    }))
    // }

    console.log("ssg", paths);
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    let data = [];

    // console.log("cek staticprops", context.params)

    await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((response) => {
            data = response
        })
        .catch((err) => {
            console.log(`[Error]\nCaused: ${err.message}`)
            data = []
        })
    return {
        props: {
            data
        }
    }
}