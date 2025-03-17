import { Dispatch, RefObject, SetStateAction, useEffect, useLayoutEffect, useState} from 'react';

// interface IRefExcaliburGame
// {
//     game: Engine | null;
//     currentScene: Scene | null;
// }

// type ExcaliburRef = RefObject<IRefExcaliburGame | null>

// type UseExcaliburReturn = [
//     setSomeState:Dispatch<SetStateAction<boolean>>
// ]


const useExcaliburGame = (
    excaliburRef: any //ExcaliburRef,
  )/*: UseExcaliburReturn */ => {

    const [someState, setSomeState] = useState(false)
    
    useLayoutEffect(() => {
        if (excaliburRef.current === null){
            const that = this
            console.log({that})

            Promise.all(
                [
                    import('excalibur'),  
                    import("@/excalibur/config"),
                    import("@/excalibur/resources")
                ]
            ).then(
                ([{ Engine, Color, FadeInOut }, configModule, {loader}]) => {
                    const excaliburConfig = configModule.default
                    const game = new Engine(excaliburConfig)

                    excaliburRef.current = {game, currentScene: null}
                    
                    game.start('start', { // name of the start scene 'start'
                        loader, // Optional loader (but needed for loading images/sounds)
                        inTransition: new FadeInOut({ // Optional in transition
                        duration: 1000,
                        direction: 'in',
                        color: Color.ExcaliburBlue
                        })
                    }).then(() => {
                        excaliburRef.current = {game: game, currentScene:game.currentScene}
                    }); 
                })
        }
        
        return () => {
            if (excaliburRef.current?.game)
            {   
                excaliburRef.current.game.dispose()
            }
            excaliburRef.current = null
        }
        
    }, []);
    
    useEffect(() => {
            // EventEmitter
    }, []);
  
    return [setSomeState];
  };

export default useExcaliburGame