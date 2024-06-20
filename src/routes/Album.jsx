import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component"
import notFound from '../assets/image.png'
import loading from '../assets/loading.png'

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Album = () => {
    const { albumId } = useParams();

    const {
        data: photos,
        error,
        isValidating
    } = useSWR(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`, fetcher);

    const {
        data: album,
        errorAlbum,
        isValidatingAlbum
    } = useSWR(`https://jsonplaceholder.typicode.com/albums/${albumId}`, fetcher);

    if (error) return <div className='failed'>failed to load</div>;
    if (isValidating) return (
        <div className="Loading">
            <div className="spinner-grow text-secondary px-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary px-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary px-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
    <div className='container'>
        <div className='card'>
            {album && (
                <div className='card-header'>
                    <h1>{capitalize(album.title)}</h1>
                    <a className=' btn btn-primary' href={`/profile/${album.userId}`}>Go back to user</a>
                </div>
            )}
            
            <div className='card-body'>
                <div className='row'>
                    {photos && photos.map((photo) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={photo.id}>
                            <div className="card">
                                <LazyLoadImage 
                                    src={photo.url}   
                                    className="card-img-top" 
                                    alt={photo.title} 
                                    onError={(e)=>{e.target.src=notFound}} 
                                    placeholderSrc={loading}
                                    height={250}
                                    />
                                <div className="card-body">
                                    <p className="card-text">{photo.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    </div>
        
    )
}

export default Album