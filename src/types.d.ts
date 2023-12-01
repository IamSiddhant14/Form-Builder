interface  DraggedItem  {
    id: number,
    screenX: number,
    screenY: number,
    text: string,
    isClicked: boolean,
    fontWeight: number,
    fontSize: number,
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitCallback: (item : DraggedItem) => void;
    selectedItem: DraggedItem | null
}

interface CanvasProps {
    onDrop: (items: DraggedItem[]) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    droppedItems: DraggedItem[];
}

interface ButtonProps { 
    children : React.ReactNode, 
    onClick?: (event: React.MouseEvent) => void;
}

interface FormState {
    text: string;
    x: number;
    y: number;
    fontsize: number;
    fontweight: number;
}