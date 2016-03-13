class SimpleDataTestBuilder {
	private var version: String
	private var buildNumber: Float
	private var description: String

	private init() {
		version = "0.0.1"
		buildNumber = 48
		description = "Some simple data format"
	}

	class func aBuilder() -> SimpleDataTestBuilder {
		return SimpleDataTestBuilder()
	}

	func withVersion(version: String) -> SimpleDataTestBuilder {
		self.version = version
		return self
	}

	func withBuildNumber(buildNumber: Float) -> SimpleDataTestBuilder {
		self.buildNumber = buildNumber
		return self
	}

	func withDescription(description: String) -> SimpleDataTestBuilder {
		self.description = description
		return self
	}

	func build() -> SimpleData {
		return SimpleData(version: version, buildNumber: buildNumber, description: description)
	}
}
