async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')

    server.listen()
  } else {
    const { worker } = await import('./browser')
    console.log(worker)
    worker.start()
  }
}

export { initMSW }
