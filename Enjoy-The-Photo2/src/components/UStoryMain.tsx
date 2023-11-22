import useApp from "../context/useApp"

export default function UStoryMain() {
    const { uStory } = useApp()

    // Reverse the uStory array if it exists
    const reversedUStory = uStory ? [...uStory].reverse() : []

    return (
        <main className="ustories-container">
            {reversedUStory.map(story => (
                <div className="one-uStory-container">
                    <h2 className="one-ustory-title">{story.name}</h2>
                    <div className="one-ustory-body">
                        {story.body.map(photo => (
                            <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} />
                        ))}
                    </div>
                </div>
            ))}
        </main>
    )
}
    //         <h2 className="ustory-title">{story.name}</h2>
    //     <div className="ustory-body">
    //         {story.body.map(photo => <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} />)}
    //     </div>
    //     </div>))}
// 
//     // </main>
//   )
// }

