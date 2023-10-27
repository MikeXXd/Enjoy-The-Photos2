
interface UStoryTemporaryProps {
    onClose: (isOpen: boolean) => void;
  }

const UStoryTemporary = ({ onClose}: UStoryTemporaryProps) => {
    return (
        <div
          className="about-container"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1563391017873-6e6beab67fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHwxNXx8Y29uc3RydWN0aW9ufGVufDB8fHx8MTY5ODQxNjYyN3ww&ixlib=rb-4.0.3&q=80&w=1080")'
          }}
        >
          <div>
            <button onClick={() => onClose(false)} className="modal-btn-close" >
              X
            </button>
          </div>
          <h2 className="about-text">
            Hello User :-)
            This section is under development and will be available soon.
          </h2>
        </div>
    )
}

export default UStoryTemporary