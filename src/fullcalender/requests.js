
  import React, { useState } from 'react';
  
    function Example() {
     const [count, setCount] = useState(0);
     const [age, setAge] = useState(42);
     const [fruit, setFruit] = useState('banana');
    
  
     return (
       <div>
        <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button onClick={() => setAge(age + 1)}>
          Click me
        </button>
        <button onClick={() => setFruit("kiwi")}>
          Click me
        </button>
       </div>
     );
   }

