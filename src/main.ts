import "./style.css"
import axios from "axios"
import {z} from "zod"

const app = document.getElementById("app") as HTMLDivElement

const ResponseSchema = z.object({
  date: z.date(),
  explanation: z.string(),
  url: z.string(),
  title: z.string(),
})

type Response = z.infer<typeof ResponseSchema>

let baseUrl = `https://api.nasa.gov/planetary/apod?api_key=91FhvhJfZM5WZjw97qXdIfzcfodx0donh3xNiOU3`

const getData = async (url: string) => {
  const response = await axios.get(url)
  const data = response.data
  renderData(data)
}

getData(baseUrl)

const renderData = (response: Response) => {
  const { title, date, explanation, url } = response

  app.innerHTML = `
    <div class="flex align-middle justify-around">
        <div class="w-1/3 my-10">
            <h1 class="text-2xl font-semibold items-center">${title}</h1>
            <h2 class="my-4 italic ">${date}</h2>
            <div>${explanation}</div>
            <input value=${date} class="mt-8 p-2 border-2 border-black rounded-xl focus:ring-0" type="date" id="calendar">
        </div>
        <div>
            <img src="${url}"class="max-h-screen p-10"/>
        </div>
    </div>
    `
  const input = document.getElementById("calendar") as HTMLInputElement;

  input.addEventListener("change", () => {
    let pastDataUrl = `https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=91FhvhJfZM5WZjw97qXdIfzcfodx0donh3xNiOU3`
    getData(pastDataUrl)
  })
}