const Share = (title, attendees) => {

    const userArr = ["user1", "user2", "user3", "user4", "user5"]

    return (
        <>
            <div className="bg-black w-full h-full flex flex-center">
                <div className="bg-white w-96 h-fit flex flex-col rounded-xl p-5 gap-3">
                    <h1 className="font-semi-bold text-3xl">Share "Event1"</h1>
                    <input placeholder="Invite People" className="border border-black w-full h-10 p-4 rounded-sm outline-none">
                    </input>
                    <h1 className="font-semibold text-xl">People with access</h1>
                    <div className="flex flex-col gap-3">
                        {userArr.length > 0 && userArr.map((user, index) => (
                            <div key = {index} className="flex flex-row gap-2">
                                <p>Image</p>
                                <p className="text-base">{user}</p>
                            </div>
                            )
                        )}
                    </div>
                    <div className="w-full h-11 flex flex-row justify-between">
                        <button className="blue_btn">Copy link</button>
                        <button className="blue_btn">Done</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Share