interface  DraggedItem  {
    id: number,
    screenX: number,
    screenY: number,
    text: string,
    isClicked: boolean,
    fontWeight: number,
    fontSize: number,
}

interface Iprops {
    isOpen: boolean;
    onClose: () => void;
    name: string;
    x: number;
    y: number;
}

interface CanvasProps {
    onDrop : (items : DraggedItem[]) => void,
    onDragOver? : (e : DragEvent) => void,
    droppedItems : DraggedItem[]
}

interface ButtonProps { 
    children : React.ReactNode, 
    onClick: (event: React.MouseEvent) => void;
}