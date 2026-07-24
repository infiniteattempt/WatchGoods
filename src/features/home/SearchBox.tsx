import { useTranslations } from "next-intl"

const SearchBox = () => {
    const translations = useTranslations()

    return <input type="text" placeholder={translations("search_hint")} />
}
export default SearchBox