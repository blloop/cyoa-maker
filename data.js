const SCENES = [
  [
    'scenes/10.png',
    'Scene Text',
    1
  ], // Choice 0.5
  [
    'scenes/20.png',
    'Scene Text',
    4
  ], // Choice 1.5
  [
    'scenes/20.png', 
    'Scene Text',
    5
  ], // Choice 2.5
  [
    'scenes/1.png', 
    ['Choice A', 'Choice B', 'Choice C'], 
    [0, 1, 2]
  ], // Choice 1
  [
    'scenes/2.png', 
    ['Choice A', 'Choice B', 'Choice C'], 
    [0, 1, 2]
  ], // Choice 2
  [
    'scenes/3.png', 
    ['Choice A', 'Choice B', 'Choice C'], 
    [0, 1, 2]
  ], // Choice 3
]

// Scene structure:
// [0]: Scene image
// [1]: Basic Scene: String to display
//      Selection Scene: Array of choice strings
// [2]: Basic Scene: Number of next scene
//      Selection Scene: Array of next scene numbers
