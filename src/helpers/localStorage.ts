export const getLocalData = () => {
    return JSON.parse(localStorage.getItem("DroppedItems")!)
}

export const setLocalData = (items : DraggedItem[]) => {
    return localStorage.setItem("DroppedItems", JSON.stringify(items))
}