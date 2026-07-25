import { useTranslations } from "next-intl"

const SearchBox = () => {
    const translations = useTranslations()

    return <input type="text" className="w-full border border-zinc-300 px-4 py-2"
    placeholder={translations("search_hint")} />
}
export default SearchBox