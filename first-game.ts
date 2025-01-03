/**
 * Grow and multiply your organisms to end up larger than your opponent.
 **/

var inputs: string[] = readline().split(' ');
const width: number = parseInt(inputs[0]); // columns in the game grid
const height: number = parseInt(inputs[1]); // rows in the game grid
var turnNum: number = 0;
var latestOwnId: number = 0;

// game loop
while (true) {
    const entityCount: number = parseInt(readline());
    
    class OrganismPart {
        x: number;
        y: number;
        type: string;
        organId: number;
        organDir: string;
        organParentId: number;
        organRootId: number;

        constructor(x, y, type, organId, organDir, organParentId, organRootId) {
          this.x = x; 
          this.y = y;
          this.type = type;
          this.organId = organId;
          this.organDir = organDir;
          this.organParentId = organParentId;
          this.organRootId = organRootId;
        }
    }

    var myEntities: OrganismPart[] = [];

    for (let i = 0; i < entityCount; i++) {
        var inputs: string[] = readline().split(' ');
        
        const x: number = parseInt(inputs[0]);
        const y: number = parseInt(inputs[1]); // grid coordinate
        const type: string = inputs[2]; // WALL, ROOT, BASIC, TENTACLE, HARVESTER, SPORER, A, B, C, D
        const organId: number = parseInt(inputs[4]); // id of this entity if it's an organ, 0 otherwise
        const organDir: string = inputs[5]; // N,E,S,W or X if not an organ
        const organParentId: number = parseInt(inputs[6]);
        const organRootId: number = parseInt(inputs[7]);
        const owner: number = parseInt(inputs[3]); // 1 if your organ, 0 if enemy organ, -1 if neither
        
        if (owner === 1) {
            // console.error(x, y, type, organId, organDir, organParentId, organRootId);
            myEntities.push(new OrganismPart(x, y, type, organId, organDir, organParentId, organRootId));
            // goes in ascending order
            latestOwnId = organId;
        }
    }
    var inputs: string[] = readline().split(' ');
    const myA: number = parseInt(inputs[0]);
    const myB: number = parseInt(inputs[1]);
    const myC: number = parseInt(inputs[2]);
    const myD: number = parseInt(inputs[3]); // your protein stock
    var inputs: string[] = readline().split(' ');
    const oppA: number = parseInt(inputs[0]);
    const oppB: number = parseInt(inputs[1]);
    const oppC: number = parseInt(inputs[2]);
    const oppD: number = parseInt(inputs[3]); // opponent's protein stock
    const requiredActionsCount: number = parseInt(readline()); // your number of organisms, output an action for each one in any order
    
    // get organ on furthest to the right
    var idToMove = 0;
    var furthestX = 0;
    var organY = 0;
    for (let i = 0; i < myEntities.length; i++) {
        var entity = myEntities[i];
        if (entity.x >= furthestX) {
            furthestX = entity.x;
            organY = entity.y;
            idToMove = entity.organId;
        }
        // console.error(`${entity.x}, ${entity.y}`);
    }

    var yModifications = [0, 0, -1, 0, ];
    if (turnNum === 3) {
        console.log('GROW ' + latestOwnId + ' ' + (furthestX) + ' ' + (organY - 1) + ' ' + 'BASIC');
    }
    else {
        console.log('GROW ' + latestOwnId + ' ' + (furthestX + 1) + ' ' + organY + ' ' + 'BASIC');
    }

    turnNum++;
}
