/**
 * @typedef {Object} FrameContext
 * @property {number} deltaTime
 * @property {number} elapsedTime
 * @property {import('./input.js').InputState} input
 * @property {import('./assets.js').AssetManager} assets
 * @property {import('./renderer2d.js').Renderer2D} renderer
 * @property {import('./tilemap.js').Tilemap} tilemap
 * @property {import('./camera.js').Camera2D} camera
 * @property {import('./collision.js').CollisionWorld} collision
 */

/**
 * @typedef {Object} GameCallbacks
 * @property {(context: FrameContext) => void} init
 * @property {(context: FrameContext) => void} update
 * @property {(context: FrameContext) => void} render
 */
