Classes  @experimental
======================



Iterate
-------

The iterate is a function that iterates over class lists(the classes array).
It is the probably the main portion of the classes portion of the Stats library.
The iterate function recieves an array of functions which it executes over the classes array sequentially.The functions are given 3 arguments on execution:-
  -The current class object.
  -A collective space.
  -The params given to the create function.

The iterator runs in the following cases by default:-
  -When the `create` method is called.It is called with the core methods.
  -It is called when the set method is called.


PkgManager
----------

PkgManager is the extensibilty of the Classes framework.
PkgManager uses Packages.Packages make it easy to make thing based on the classes framework.

To incorporate a package into the classes, call `classes.PkgManager.push( __Package__ )`.
All package objects contain a manifest object which describes the type of package and how to run the package and the dependencies of the package.

###Types
There are many types of packages.
  -Bootstrap
  -PreBoots
  -BootControl
  -PostBoot

One of these is set as the `type` property of `Package` object.


####Bootstrap
Bootstrap packages are very simple.
They run on the `Iterate` function.
They should be used often.

These packages are just an array of functions that will be passed to the `Iterate` function.These are declared as follows:

	Package:{
		name:'some unique name',
		Manifest :{
			type :'Bootstrap'
			run  : [ someFunc , someFunc ],
			space: 'private' or 'public'
		}
	}

  -The run array contains function which are run on the `Iterate` . 
  -The space variable value indicates whether the package has its own space or not.The space is an object that is used to preserve information between function calls.If you want to store a variable that persists over the whole `Iterate` function

The core methods are of this type.

####PreBoot
The before package just runs a function before the core methods are run.
Currently I have no idea what these could be used for.Anyway i will add the basic schematic.

    Package:{
    	name : 'some unique name',
    	Manifest : {
    		type : 'PreBoot',
    		run  : func,
        }
    }

#### BootControl
These packages can control the whole boot process.You can actually access core from here.It is normally recommended to avoid using this type of package so that the program may stay stable.It requires you to manually run the boot process.

    Package:{
        name : 'some unique name',
        Manifest : {
            type : 'BootControl',
            run  : func,
        }
    }

####PostBoot
These run a function after the iterate function runs.They are the most powerful ones.They get the whole classes array when it is completed.They can run the iterate function or the boot function by themselves.

	Package:{
		name : 'some unique name',
		Manifest : {
			type : 'PostBoot'
			run  : func,
		}
	}


###Dependencies
Dependencies is an array which contains the names of the packages on which the package depends.These help in error handling.
