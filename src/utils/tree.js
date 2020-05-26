export const headFor = (o, cb) => {
	if (!o) return
	o.forEach(child => {
		cb(child)
		if (child.list) {
			headFor(child.list, cb)
		}
	})
}
