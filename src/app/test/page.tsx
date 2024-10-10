
const multiplier = (a: number, b: number, printText: string) : void => {
    console.log(printText, a * b);
}

export default function Page () {
    multiplier(2, 3, "The result is: ")
    return (
        <div>
            pagina test
        </div>
    )
}

