import { MovieItem } from "@/src/network/api/GetMovieListApi";
import "./MovieItem.css";

const MovieItemCell = (props : {item : MovieItem, onclick : () => void}) => {
    return (
        
        <div className={"item"} onClick={props.onclick}>
            <img src={props.item.Poster} alt={props.item.Title} />
            <p>{props.item.Title}</p>
        </div>
    )
}

export default MovieItemCell;