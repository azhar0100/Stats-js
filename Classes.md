<<<<<<< HEAD
EXPERIMENTAL
============

Package manager is a way to make the classes construct extensible.
This way the Classes module could be spread over several files or areas.
The Packages object will be containing some expected constructs.
It will have a 'type' system to optimize performance and introduce 
simplicity.Some packages will have to access the classes objects as a
whole while some
of them will not do more than do a one time property manipulation.
Care must be taken to not introduce modules which are very small(that will cause maintnance to be hard) 
or modules which are very large(beats the purpose of this PackageManager).

General Configuration of package
--------------------------------

{
type:'One of many'
//The rest of the package is determined by the type of permission
}

###Bootstrap
Bootstrap type packages have the ability to start when the
create method is called so it is a very optimizing type of package.
Many light-medium weight packages can be defined as Bootstrap
packages.They do not have to be coupled with the iterator and
run after the iterator.Their are some kinds of bootstrap packages like:-

####Iterator Packages
They run using the iterator.They are very simple.Using them is also very efficient.

#####Examples
This package is an iterator package.

    pkg = {
    	type : "bootstrap.Iterator" , 
    	exec : 
    	function exec( clas,space,params ){
    		<!-- the clas variable is the current class in the iterator.and the space is an object whose properties are retained even after the iteration.There is also a format to each indivual item.If each is enclosed by an object that holds a property "retain" in addition to the object then they will also be included in the final classes object.params is the params accepted by the Classes create mehthod. -->

    		clas.fX = clas.freq * clas.midpoint 

    		space.sumOfF +=  
    	} 
	}
=======
#EXPERIMENTAL#
				Package manager is a way to make the classes construct extensible.
				This way the Classes module could be spread over several files or areas.
				The Packages object will be containing some expected constructs.
				It will have a 'type' system to optimize performance and introduce 
				simplicity.Some packages will have to access the classes objects as a
				whole while some
				of them will not do more than do a one time property manipulation.
				Care must be taken to not introduce modules which are very small(that will cause maintnance to be hard) 
				or modules which are very large(beats the purpose of this PackageManager).
				
				General Configuration of package
				===============================

					{
						type:'One of many'
						//The rest of the package is determined by the type of permission
					}

					###Bootstrap
						Bootstrap type packages have the ability to start when the
						create method is called so it is a very optimizing type of package.
						Many light-medium weight packages can be defined as Bootstrap
						packages.They do not have to be coupled with the iterator and
						run after the iterator.Their are some kinds of bootstrap packages like:-

						####Iterator Packages
							They run using the iterator.They are very simple.Using them is also very efficient.

							#####Examples
								This package is an iterator package.
								pkg = {
									type : "bootstrap.Iterator" , 
									exec : 
									function exec( clas,space,params ){
										<!-- the clas variable is the current class in the iterator.and the space is an object whose properties are retained even after the iteration.There is also a format to each indivual item.If each is enclosed by an object that holds a property "retain" in addition to the object then they will also be included in the final classes object.params is the params accepted by the Classes create mehthod. -->

										clas.fX = clas.freq * clas.midpoint

										space.sumOfF += 

									}
								}
