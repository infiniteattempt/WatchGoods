import { MovieItem } from "@/src/network/api/GetMovieListApi";
import "./MovieItem.css";

const MovieItemCell = (props : {item : MovieItem}) => {
    return (
        <div className={"item"}>
            <img src={props.item.Poster} alt={props.item.Title} />
            <p>{props.item.Title}</p>
        </div>
    )
}

export default MovieItemCell;