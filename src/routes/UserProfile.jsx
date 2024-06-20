import useSWR from 'swr';
import { useParams } from 'react-router-dom';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserProfile = () => {
    const { userId } = useParams();

    const {
        data: user,
        error,
        isValidating
    } = useSWR(`https://jsonplaceholder.typicode.com/users/${userId}`, fetcher);

    const {
        data: albums,
        errorAlbum,
        isValidatingAlbum
    } = useSWR(`https://jsonplaceholder.typicode.com/users/${userId}/albums`, fetcher);

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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

  return (
    <div className="container">
        <div className="card" >
            <div className='card-header d-flex justify-content-end'>
                <a className='btn btn-primary' href="/" >Go to user list</a>
            </div>

            <div className='card-body'>
                <table className="table table-borderless">
                    <tbody>
                        <tr><td><b>Name</b></td><td>{user.name}</td></tr>
                        <tr><td><b>Username</b></td><td>{user.username}</td></tr>
                        <tr><td><b>Email</b></td><td>{user.email}</td></tr>
                    </tbody>
                    
                </table>

                <hr className='my-5'/>

                <div className="albums">
                    <h4>Albums</h4>
                    <ul className='list-group list-group-flush'>
                        {errorAlbum ? <p>Failed to load.</p>: <></>}
                        {isValidatingAlbum ? <p>Loading...</p>: <></>}

                        {albums && 
                        albums.map((album) => (
                            <li className='list-group-item' key={album.id}>
                                <a className='link-underline link-underline-opacity-0 link-underline-opacity-100-hover' href={`/album/${album.id}`} >
                                    {capitalize(album.title)}
                                </a>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile